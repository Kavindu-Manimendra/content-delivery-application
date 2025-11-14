const TOKEN_KEY = 'app_token';
const USER_ID = 'user_id';

export function saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function saveUserId(userId: string) {
    localStorage.setItem(USER_ID, userId);
}

export function getUserId(): string | null {
    return localStorage.getItem(USER_ID);
}

export function removeUserId() {
    localStorage.removeItem(USER_ID);
}