import api from "../../api/axioClients.ts";
import type {APIResponse, JwtAuthenticationResponse, SignInRequest, SignUpRequest} from "../../types";

export const signup = async (data: SignUpRequest): Promise<APIResponse<null>> => {
    const res = await api.post<APIResponse<null>>("/auth/register", data);
    return res.data;
};

export const signin = async (
    data: SignInRequest): Promise<APIResponse<JwtAuthenticationResponse>> => {
    const res = await api.post<APIResponse<JwtAuthenticationResponse>>("/auth/login", data);
    return res.data;
};