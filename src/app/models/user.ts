export class User {
    constructor(
        public uuid: string,
        public initiatorUid: string,
        public name: string,
        public phoneNumber?: string,
        public email?: string,
        public avatarUrl?: string,
        public country?: string,
        public countryPrefix?: string
    ) {}
}
