import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})

// nota: Não colocar nada aqui fora
// QUEBRA!!!!

// const token: string =
//   "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJab1NKRUhzNGhPcnpCdmZWanVhcDJ5Sy04Qm5XY0E0c2hSdTZjMTlfUF8wIn0.eyJqdGkiOiJlMDY0MzMyOS0wYTlkLTRjZmQtODZmNi04MDdkMDVkOTI4YTYiLCJleHAiOjE1ODQxNTg0NTYsIm5iZiI6MCwiaWF0IjoxNTg0MTI5NjU2LCJpc3MiOiJodHRwOi8vaXRhcy5hczJncm91cC5jb20uYnI6ODA5MC9hdXRoL3JlYWxtcy9hczJncm91cCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJlMjVlN2Y0MS03ZjgzLTRjMDMtOGZiNi1iMWVlNzA4NjE5NTkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ0bnQiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiI5OTFlNWZmYi01NDAyLTRjYTMtYTUxZi1mMzViNWU3YTdkZjMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJFQURfUEFSQU1FVEVSUyIsIlJFQURfR0FMTEVSWV9UQUdTIiwiUkVBRF9QUk9QRVJUWSIsIkNSRUFURV9HQUxMRVJJRVMiLCJSRUFEX1ZBTElEQVRPUlMiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIkFSQ0hJVkVfV09SS1BMQU4iLCJBUkNISVZFX09QRVJBVElPTiIsIkRFTEVURV9KT0IiLCJSRUFEX0RFVklDRVMiLCJDUkVBVEVfVElHSFRFTklORyIsIkNSRUFURV9PUEVSQVRJT04iLCJSRUFEX0NIQVJBQ1RFUklTVF9HUk9VUCIsIlJFQURfTUFOX1BST0RVQ1RJT05fQ0FMRU5EQVIiLCJSRUFEX0NMQVNTSUZJQ0FUSU9OIiwiRVhURVJOQUxfTUFJTlRFTkFOQ0UiLCJSRUFEX01BTlVGQUNUVVJJTkciLCJSRUFEX0NIQVJBQ1RFUklTVF9JVEVNIiwiQVJDSElWRV9KT0IiLCJSRUFEX1JBQkJJVF9NUSIsIlJFQURfUEFSVFMiLCJDUkVBVEVfV09SS1NUQVRJT04iLCJSRUFEX0ZVTkNUSU9OUyIsIkNSRUFURV9KT0IiLCJVUERBVEVfUFJPRFVDVF9NQU5VRkFDVFVSSU5HIiwiVVBEQVRFX09QRVJBVElPTiIsIkFSQ0hJVkVfR0FMTEVSSUVTIiwiUkVBRF9TRVJJQUxfTlVNQkVSIiwiUkVBRF9ET0NVTUVOVF9UWVBFIiwib2ZmbGluZV9hY2Nlc3MiLCJDUkVBVEVfU0VRVUVOQ0VfUFJPRFVDVElPTiIsIlJFQURfV09SS1BMQU4iLCJERUxFVEVfT1BFUkFUSU9OIiwiUkVBRF9XT1JLU1RBVElPTiIsIlJFQURfUFJPRFVDVCIsIlVQREFURV9XT1JLUExBTiIsIlJFQURfRlVOQ1RJT05fR1JPVVBTIiwiQ1JFQVRFX1BST0RVQ1QiLCJDUkVBVEVfUFJPRFVDVF9NQU5VRkFDVFVSSU5HIiwiRVhURVJOQUxfQllQQVNTIiwiRVhURVJOQUxfQ09ORklHVVJBVElPTiIsIlJFQURfVEFTSyIsIlJFQURfQ0FURUdPUklFUyIsIlJFQURfT1BFUkFUSU9OIiwiUkVBRF9KT0IiLCJDUkVBVEVfV09SS1BMQU4iLCJDUkVBVEVfQklMTF9PRl9NQVRFUklBTFMiLCJSRUFEX1NFUklBTCIsIlJFQURfR0FMTEVSSUVTIiwiVVBEQVRFX0pPQiIsIlJFQURfVE9PTFMiLCJSRUFEX0NPTVBPTkVOVFMiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkFkcmlhbm8gVmFsYWRhcmVzIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRyaWFuby52YWxhZGFyZXMiLCJnaXZlbl9uYW1lIjoiQWRyaWFubyIsIndvcmtsaW5lcyI6WyJiZDY0ODg4ZS01ZTU5LTQyNWUtYTdlNi02OGM0YWM2YjJlOTgiLCIwMTgwY2M2MS1hZDk4LTRkMDQtOWVmZC0xODNhNzczYWI1ZjYiXSwiZmFtaWx5X25hbWUiOiJWYWxhZGFyZXMiLCJlbWFpbCI6ImFkcmlhbm92YWxhZGFyZXNAYXMyZ3JvdXAuY29tLmJyIn0.tTv2lniU7Fb7CrxoVqFA2ZxvskClMyMGXaJjbF5S3rmCe0Z1a01HqEDM0F8qbQusqYe3RfsgfuGdNAMiXKPfokxRhOYb-AuwVSAPc_o6ZTQuupUc_4L8oZsU040xgDOArikEG-0Ik8-mjpE7hCm3JLo1FJqGI1psuL8yCmNhVA9RODmZRpfmWP5FflZY6k2BnMiNwdjQRPMS6Yx2YyMt2fu0Ph5uCEt3yyU4oWT3M7oVr8Ua42PcbPUKB2-dfHuIY2Y-cICLuvv4mZN3ddBimojmNRH75r0faFjC3A5mIHHTfYPFjyWngtOjzVU9B1rRmRlU6zXDijrGqcv3MMz6oA";

// const httpOptions = {
//   headers: new HttpHeaders({
//     "Content-Type": "application/json",
//     "workline-context": "bd64888e-5e59-425e-a7e6-68c4ac6b2e98",
//     "Authorization": `Bearer ${token}`
//   })
// };

export class RequestsService {
  // url = "tnt.as2group.com.br" http://tnt.as2group.com.br:8080/
  url = "192.168.0.56";
  token: string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJab1NKRUhzNGhPcnpCdmZWanVhcDJ5Sy04Qm5XY0E0c2hSdTZjMTlfUF8wIn0.eyJqdGkiOiJlMDY0MzMyOS0wYTlkLTRjZmQtODZmNi04MDdkMDVkOTI4YTYiLCJleHAiOjE1ODQxNTg0NTYsIm5iZiI6MCwiaWF0IjoxNTg0MTI5NjU2LCJpc3MiOiJodHRwOi8vaXRhcy5hczJncm91cC5jb20uYnI6ODA5MC9hdXRoL3JlYWxtcy9hczJncm91cCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJlMjVlN2Y0MS03ZjgzLTRjMDMtOGZiNi1iMWVlNzA4NjE5NTkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ0bnQiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiI5OTFlNWZmYi01NDAyLTRjYTMtYTUxZi1mMzViNWU3YTdkZjMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJFQURfUEFSQU1FVEVSUyIsIlJFQURfR0FMTEVSWV9UQUdTIiwiUkVBRF9QUk9QRVJUWSIsIkNSRUFURV9HQUxMRVJJRVMiLCJSRUFEX1ZBTElEQVRPUlMiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIkFSQ0hJVkVfV09SS1BMQU4iLCJBUkNISVZFX09QRVJBVElPTiIsIkRFTEVURV9KT0IiLCJSRUFEX0RFVklDRVMiLCJDUkVBVEVfVElHSFRFTklORyIsIkNSRUFURV9PUEVSQVRJT04iLCJSRUFEX0NIQVJBQ1RFUklTVF9HUk9VUCIsIlJFQURfTUFOX1BST0RVQ1RJT05fQ0FMRU5EQVIiLCJSRUFEX0NMQVNTSUZJQ0FUSU9OIiwiRVhURVJOQUxfTUFJTlRFTkFOQ0UiLCJSRUFEX01BTlVGQUNUVVJJTkciLCJSRUFEX0NIQVJBQ1RFUklTVF9JVEVNIiwiQVJDSElWRV9KT0IiLCJSRUFEX1JBQkJJVF9NUSIsIlJFQURfUEFSVFMiLCJDUkVBVEVfV09SS1NUQVRJT04iLCJSRUFEX0ZVTkNUSU9OUyIsIkNSRUFURV9KT0IiLCJVUERBVEVfUFJPRFVDVF9NQU5VRkFDVFVSSU5HIiwiVVBEQVRFX09QRVJBVElPTiIsIkFSQ0hJVkVfR0FMTEVSSUVTIiwiUkVBRF9TRVJJQUxfTlVNQkVSIiwiUkVBRF9ET0NVTUVOVF9UWVBFIiwib2ZmbGluZV9hY2Nlc3MiLCJDUkVBVEVfU0VRVUVOQ0VfUFJPRFVDVElPTiIsIlJFQURfV09SS1BMQU4iLCJERUxFVEVfT1BFUkFUSU9OIiwiUkVBRF9XT1JLU1RBVElPTiIsIlJFQURfUFJPRFVDVCIsIlVQREFURV9XT1JLUExBTiIsIlJFQURfRlVOQ1RJT05fR1JPVVBTIiwiQ1JFQVRFX1BST0RVQ1QiLCJDUkVBVEVfUFJPRFVDVF9NQU5VRkFDVFVSSU5HIiwiRVhURVJOQUxfQllQQVNTIiwiRVhURVJOQUxfQ09ORklHVVJBVElPTiIsIlJFQURfVEFTSyIsIlJFQURfQ0FURUdPUklFUyIsIlJFQURfT1BFUkFUSU9OIiwiUkVBRF9KT0IiLCJDUkVBVEVfV09SS1BMQU4iLCJDUkVBVEVfQklMTF9PRl9NQVRFUklBTFMiLCJSRUFEX1NFUklBTCIsIlJFQURfR0FMTEVSSUVTIiwiVVBEQVRFX0pPQiIsIlJFQURfVE9PTFMiLCJSRUFEX0NPTVBPTkVOVFMiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkFkcmlhbm8gVmFsYWRhcmVzIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRyaWFuby52YWxhZGFyZXMiLCJnaXZlbl9uYW1lIjoiQWRyaWFubyIsIndvcmtsaW5lcyI6WyJiZDY0ODg4ZS01ZTU5LTQyNWUtYTdlNi02OGM0YWM2YjJlOTgiLCIwMTgwY2M2MS1hZDk4LTRkMDQtOWVmZC0xODNhNzczYWI1ZjYiXSwiZmFtaWx5X25hbWUiOiJWYWxhZGFyZXMiLCJlbWFpbCI6ImFkcmlhbm92YWxhZGFyZXNAYXMyZ3JvdXAuY29tLmJyIn0.tTv2lniU7Fb7CrxoVqFA2ZxvskClMyMGXaJjbF5S3rmCe0Z1a01HqEDM0F8qbQusqYe3RfsgfuGdNAMiXKPfokxRhOYb-AuwVSAPc_o6ZTQuupUc_4L8oZsU040xgDOArikEG-0Ik8-mjpE7hCm3JLo1FJqGI1psuL8yCmNhVA9RODmZRpfmWP5FflZY6k2BnMiNwdjQRPMS6Yx2YyMt2fu0Ph5uCEt3yyU4oWT3M7oVr8Ua42PcbPUKB2-dfHuIY2Y-cICLuvv4mZN3ddBimojmNRH75r0faFjC3A5mIHHTfYPFjyWngtOjzVU9B1rRmRlU6zXDijrGqcv3MMz6oA";

  environment = {
    production: false,
    authentication: "http://tnt.as2group.com.br:8087",
    apiOperational: `http://${this.url}:8085`,
    apiConfiguration: `http://${this.url}:8083`,
    websocket: `ws://${this.url}:8085/api/as2/websocket`,
    apiMaterial: `http://${this.url}:8082`,
    apiDevice: `http://${this.url}:8089`
  };
  constructor(private http: HttpClient) {}

  getOperationsPaginated(pageSize = 20, pageNumber = 0) {
    // tudo que precisa ser mandando na requisisção, precisa estar dentro do
    // obj depois da url, a identificação é feita pelo nome: EX: 'headers'; 'params' e etc..
    return this.http
      .get(`${this.environment.apiOperational}/api/operations`, {
        headers: {
          "Content-Type": "application/json",
          "workline-context": "bd64888e-5e59-425e-a7e6-68c4ac6b2e98",
          "Authorization": `Bearer ${this.token}`
        },
        params: {
          size: `${pageSize}`,
          page: `${pageNumber}`
        }
      },)
      .toPromise()
      .catch(error => {
        console.log(error);

        // this.authService.checkToken(error.status);
        throw error;
      });
  }
}