import conf from '../conf/conf.js';
import {
    Client,
    Account,
    ID
} from 'appwrite';


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({
        email,
        password,
        name
    }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({
                    email,
                    password
                })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({
        email,
        password
    }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Appwrite server :: login :: error", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // Appwrite throws a 401 error if there is no active user session.
            // We only log if it is a different error (e.g. network outage, wrong config).
            if (error.code != 401) {
                console.log("Appwrite server :: getCurrentUser :: error", error);
            }
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite server :: logout :: error", error)
        }
    }
}

const authService = new AuthService();

export default authService