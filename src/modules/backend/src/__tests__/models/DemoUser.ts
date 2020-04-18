
class DemoUser {
    private static instance: DemoUser;

    public username: string;
    public email: string;
    public password: string;
    public jwt: string;

    private constructor() { }

    public static getInstance(): DemoUser {
        if (!DemoUser.instance) {
            DemoUser.instance = new DemoUser();
        }

        return DemoUser.instance;
    }
}

export default DemoUser;