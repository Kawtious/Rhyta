import crypto from 'crypto';

export class JwtSecretGenerator {
    static generate(secretLength: number) {
        return crypto.randomBytes(secretLength).toString('base64');
    }
}
