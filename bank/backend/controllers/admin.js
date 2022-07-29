const prisma = require("../utils/prisma");
const { accounts } = require("./customer");

exports.addBranch = async (req, res) => {
    if(!req.body.name || !req.body.address){
        return res.status(401).json({ message: "Credentials cannot be empty"});
    }

    try {
        await prisma.branch.create({
            data: {
                name: req.body.name,
                address: req.body.address,
            }
        });
        
        return res.status(200).json({ message: "Branch successfully created" });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.editBranch = async (req, res) => {
    if(req.body.id === "" || req.body.name === "" || req.body.address === ""){
        return res.status(401).json({ message: "Credentials cannot be empty" });
    }

    try {
        await prisma.branch.update({
            where: {
                id: Number.parseInt(req.body.id),
            },
            data: {
                name: req.body.name,
                address: req.body.address,
            }
        });
        
        return res.status(200).json({ message: "Branch successfully edited" });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.deleteBranch = async (req, res) => {
    if(req.body.id === ""){
        return res.status(401).json({ message: "Credentials cannot be empty"});
    }

    if(req.body.id === 11){
        return res.status(401).json({ message: "Main branch can't be deleted!!"});
    }

    try {
        await prisma.$executeRaw`UPDATE accounts SET branchId = 11 WHERE branchId = ${Number.parseInt(req.body.id)};`;

        await prisma.branch.delete({
            where: {
                id: Number.parseInt(req.body.id),
            }
        });
        
        return res.status(200).json({ message: "Branch successfully deleted" });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.generateReport = async (req, res) => {
    try {
        const countAccount = await prisma.accounts.groupBy({
            by: ['branchId'],
            _count: {
                accountNumber: true,
            },
        });

        const sumAmount = await prisma.accounts.groupBy({
            by: ['branchId'],
            _sum: {
                balance: true
            },
            where:{
                type: {
                    in: [1, 2]
                }
            }
        });

        const sumLoan = await prisma.accounts.groupBy({
            by: ['branchId'],
            _sum: {
                balance: true
            },
            where:{
                type:{
                    in: [3]
                }
            }
        });

        const branches = await prisma.branch.findMany();
        
        const result = {};

        countAccount.forEach(item => result[item.branchId] = {accounts: item._count.accountNumber});
        sumAmount.forEach(item => result[item.branchId].amounts = item._sum.balance);
        sumLoan.forEach(item => result[item.branchId].loans = item._sum.balance);

        return res.status(200).json({ report: result, branches });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.viewRequests = async (req, res) => {
    try {
        const requests = await prisma.request.findMany({
            select: {
                id: true,
                status: true,
                accounts: {
                    select: {
                        accountNumber: true,
                        users: true
                    }
                }
            }
        });
        return res.status(200).json({ requests });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.updateRequest = async (req, res) => {

    console.log(req.body);
    if(req.body.requestId == "" || req.body.status == ""){
        return res.status(401).json({ message: "Credentials cannot be empty" });
    }

    const account = await prisma.accounts.findMany();

    if(req.body.status !== 2 && req.body.status !== 3){
        return res.status(401).json({ message: "Status can be 2 or 3" });
    }

    if(account.type === 3){
        return res.status(411).json({message: "The loan account can't be closed in this way!"});
    }


    try {
        const request = await prisma.request.findUnique({
            where:{
                id: Number.parseInt(req.body.requestId)
            },
            include: {
                accounts: true
            }
        });

        console.log(request);

        if(!request)
            return res.status(401).json({ message: "Request does not exist" });

        if(request.accounts.active === 0)
            return res.status(401).json({ message: "Account is already closed" });
        
        console.log();

        if(Number.parseInt(req.body.status) === 2) {
            await prisma.accounts.update({
                where: {
                    accountNumber: request.accountNumber  
                },
                data: {
                    balance: {
                        decrement: 1000
                    },
                    active: 0
                }
            });
        }

        if(Number.parseInt(req.body.status) === 3) {
            await prisma.accounts.update({
                where: {
                    accountNumber: request.accountNumber  
                },
                data: {
                    active: 1
                }
            });
        }

        await prisma.request.update({
            where: {
                id: request.id,
            },
            data:{
                status: Number.parseInt(req.body.status),
            }
        });

        return res.status(401).json({ message: "Operation success"});
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.viewLoanRequests = async (req, res) => {
    try {
        const loans = await prisma.loan.findMany({
            select: {
                id: true,
                status: true,
                amount: true,
                type: true,
                period: true,
                users: true
            }
        });
        return res.status(200).json({ loans });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}


exports.updateLoanRequests = async (req, res) => {
    try {
        const loan = await prisma.loan.findUnique({
            where:{
                id: Number.parseInt(req.body.loanId)
            },
            include: {
                users: true
            }
        });

        if(!loan)
            return res.status(401).json({ message: "Request does not exist" });


        if(loan.status === 1){
            return res.status(401).json({ message: "The request is already approved" });            
        }

        var interest;

        switch(loan.type){
            case 0 : interest = 8
            break;
            case 1 : interest = 9
            break;
            case 2 : interest = 13
        }

        if(Number.parseInt(loan.amount) > 3000000){
            return res.status(401).json({ message: "The loan request should not exceed 3000000" });            
        }

        if(Number.parseInt(req.body.status) === 1) {

            await prisma.accounts.create({
                data: {
                    type: 3,
                    balance: Number.parseInt(loan.amount),
                    interest: Number.parseInt(interest),
                    branchId: Number.parseInt(loan.branchId),
                    userId: Number.parseInt(loan.userId),
                    active: 1
                }
            
            });
            
            await prisma.loan.update({
                data: {
                    status: 1,
                },
                where:{
                    id : loan.id
                }

            });
        }

        if(Number.parseInt(req.body.status) === 2) {
            await prisma.loan.update({
                where: {
                    id: loan.id,
                },
                data: {
                    status:2,
                }
                
            });
        }

        return res.status(401).json({ message: "Operation success"});
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}

