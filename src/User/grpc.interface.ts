import { Observable } from "rxjs";


export interface IGrpcService{

    helloGrpc(nullVal:nthg):Observable<any>
}
interface nthg{}