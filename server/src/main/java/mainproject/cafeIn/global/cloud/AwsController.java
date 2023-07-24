package mainproject.cafeIn.global.cloud;

import mainproject.cafeIn.global.response.ApplicationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AwsController {
    @GetMapping("/aws")
    @ResponseStatus(HttpStatus.OK)
    public ApplicationResponse healthCheck() {

        return new ApplicationResponse<>();
    }
}
