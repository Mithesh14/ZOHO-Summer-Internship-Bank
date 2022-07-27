const { branch, loan } = require("../utils/prisma");
const prisma = require("../utils/prisma");

exports.addAccount = async (req, res) => {
    if(req.body.balance === "" || req.body.type === "" || req.body.branchId === ""){
        return res.status(401).json({ message: "Credentials cannot be empty"});
    }


    if(req.body.accountType === "1" | req.body.accountType === "2" & Number.parseInt(req.body.balance) < 1000){
        return res.status(411).json({message: "Balance should be greater than 1000"});
    }

    const branch = await prisma.branch.findUnique({where:{id:Number.parseInt(req.body.branchId)}});

    if(!branch){
        return res.status(401).json({message: "Branch ID is invalid"});
    }

    console.log(req.body)

    if(req.body.accountType === "1"){
        req.body.interest = 3;
    }

    if(req.body.accountType === "2"){
        req.body.interest = 12;
    }

    try {
        await prisma.accounts.create({
            data: {
                type: Number.parseInt(req.body.accountType),
                balance: Number.parseInt(req.body.balance),
                interest: Number.parseInt(req.body.interest),
                branchId: branch.id,
                userId: req.user.id,
                active: 1
            }
        });
        
        return res.status(200).json({ message: "Account successfully created" });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.accounts = async (req, res) => {
    try {
        const loanAccounts = await prisma.accounts.findMany({
            where: {
              userId: req.user.id, 
              type: {
                in: [3]
              }
            },
            include: {
                branch: true
            }
          });

        const otherAccounts = await prisma.accounts.findMany({
            where:{
                userId: req.user.id, 
                type: {
                    in: [1, 2]
                }
            },
            include: {
                branch: true
            }
        });
    
        return res.status(200).json({ loanAccounts, otherAccounts });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.depositMoney = async (req, res) => {

    const account = await prisma.accounts.findMany({
        where:{accountNumber:Number.parseInt(req.body.accountNumber)}});

    if(!account) {
        return res.status(411).json({message: "The requested account is not there!"});    
    }

    if(account.active === "0") {
        return res.status(411).json({message: "The account must not be closed."});    
    }

    try {
        await prisma.accounts.update({
            where:{
                accountNumber: Number.parseInt(req.body.accountNumber),
            },
            data: {
                balance: { 
                    increment: Number.parseInt(req.body.amount) 
                },
            }
        });

        await prisma.transactions.create({
            data:{
                accountNumber : Number.parseInt(req.body.accountNumber),
                amount: Number.parseInt(req.body.amount),
                type: 1, //DEPOSIT
                status: "SUCCESS",
                date: new Date().toUTCString(),
            }
        })
        
        return res.status(200).json({ message: "Amount is deposited!" });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});

        await prisma.transactions.create({
            data:{
                accountNumber : Number.parseInt(req.body.accountNumber),
                amount: Number.parseInt(req.body.amount),
                type: 1, //DEPOSIT
                status: "FAILURE",
                date: new Date().toUTCString(),
            }
        })
    }
}


exports.withdrawMoney = async (req, res) => {

    const account = await prisma.accounts.findUnique({where:{accountNumber:Number.parseInt(req.body.accountNumber)}});

    if(!account) {
        return res.status(411).json({message: "The requested account is not there!"});
    }

    if(account.userId !== req.user.id){
        return res.status(411).json({message: "The account does not exist"});
    }

    if(account.active === 0){
        return res.status(411).json({message: "The account is closed"});
    }


    if((account.balance - Number.parseInt(req.body.amount))  < 1000){
        
        await prisma.transactions.create({
            data:{
                accountNumber : Number.parseInt(req.body.accountNumber),
                amount: Number.parseInt(req.body.amount),
                type: 2, //WITHDRAW
                status: "FAILURE",
                date: new Date().toUTCString()
            }
        });

        return res.status(411).json({message: "Balance should be greater than 1000"});
    }

    try {
        await prisma.accounts.update({
            where:{
                accountNumber: Number.parseInt(req.body.accountNumber),
            },
            data: {
                balance: {
                    decrement: Number.parseInt(req.body.amount)
                },
            }
        });

        await prisma.transactions.create({
            data:{
                accountNumber : Number.parseInt(req.body.accountNumber),
                amount: Number.parseInt(req.body.amount),
                type: 2, //WITHDRAW
                status: "SUCCESS",
                date: new Date().toUTCString(),
            }
        })
        
        return res.status(200).json({ message: "Amount has been withdrawn!" });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
        await prisma.transactions.create({
            data:{
                accountNumber : Number.parseInt(req.body.accountNumber),
                amount: Number.parseInt(req.body.amount),
                type: 2, //WITHDRAW
                status: "FAILURE",
                date: new Date().toUTCString(),
            }
        })
    }
}

exports.closeAccount = async (req, res) => {
    const account = await prisma.accounts.findUnique({where:{accountNumber:Number.parseInt(req.body.accountNumber)}});
    
    if(!account) {
        return res.status(411).json({message: "The requested account is not there!"});
    }

    if(account.type === 3){
        return res.status(411).json({message: "The loan account can't be closed in this way!"});
    }

    try {
        await prisma.accounts.update({
            where:{
                accountNumber: Number.parseInt(req.body.accountNumber),
                

            },

            data:{
                active: 2
            }
        });

        await prisma.request.create({
            data: {
                accountNumber: Number.parseInt(req.body.accountNumber),
                date: new Date().toUTCString(),
                status: 1 //REQUESTED
            }
        });
        
        return res.status(200).json({ message: "Request sent successfully!" });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.transactionTable = async (req, res) => {
    try {
        const transactions = await prisma.transactions.findMany({
            where: {
                accounts: {
                    userId: req.user.id
                }
            },
            orderBy: {
                id: "asc"
            }
        });
        
        return res.status(200).json({ transactions });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.fetchBranch = async (req, res) => {
    if(!branch) {
        return res.status(411).json({message: "The requested branch is not there!"});
    }

    try {
        const branches = await prisma.branch.findMany();
    
        return res.status(200).json({ branches});
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}




exports.applyLoan = async (req, res) => {

    if(req.body.amount > 3000000){
        return res.status(411).json({message: "The requesting amount should be lesser than 3000000"});
    }

    const loan = await prisma.loan.findFirst({where:{userId:req.user.id}});

    if(loan){
        return res.status(401).json({ message: "A loan request is already pending" });            
    }

    if(req.body.status===1){
        return res.status(401).json({ message: "The request is already approved by the manager!" });            
    }

    console.log(req.body);
    try {
        await prisma.loan.create({
            data: {
                type: Number.parseInt(req.body.loantype),
                amount: Number.parseInt(req.body.loanamount),
                branchId :Number.parseInt(req.body.loanbranch),
                status: 0,
                userId : req.user.id,
                period: Number.parseInt(req.body.loantenure)
            }
        });
        
        return res.status(200).json({ message: "Loan Request sent successfully!" });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.fetchLoan = async (req, res) => {
    try {
        const loan = await prisma.loan.findUnique({
            where: {
                userId: req.user.id
            }
        });
    
        return res.status(200).json({ loan });
    }
    catch(e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"});
    }
}