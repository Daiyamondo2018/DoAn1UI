import { getCookie } from "./cookie";

export async function isLogin ()  {
    const token = getCookie("access_token");
    console.log(JSON.stringify(token));
    const response = await fetch("/api/auth/token", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
    if(response.ok) {
      return true;
    }
    return false;
}