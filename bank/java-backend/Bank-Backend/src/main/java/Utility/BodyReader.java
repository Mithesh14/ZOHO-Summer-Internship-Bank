package Utility;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.stream.Collectors;

public class BodyReader {
    public static String read(HttpServletRequest req) throws IOException {
        return req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
    }
}
