
import { serialize } from 'cookie';




export function RemoveCookcis() {

  document.cookie = "next-auth.csrf-token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

}






