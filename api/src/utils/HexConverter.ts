export class HexConverter {
    static stringToHex(input: string): string {
        const hex = Array.from(input)
            .map((char) => char.charCodeAt(0).toString(16))
            .join('');

        if (hex.length % 2) {
            return hex.padStart(hex.length + 1, '0');
        }

        return hex;
    }

    static numberToHex(input: number): string {
        const hex = input.toString(16);

        if (hex.length % 2) {
            return hex.padStart(hex.length + 1, '0');
        }

        return hex;
    }

    static stringToHexWithNullTerminator(input: string): string {
        return this.stringToHex(input) + '00';
    }

    static stringToPaddedHex(
        input: string,
        reservedBytes: number,
        addAtEnd: boolean = true
    ): string {
        let paddedHex = this.stringToHex(input);
        if (addAtEnd) {
            return paddedHex.padStart(reservedBytes * 2, '0');
        } else {
            return paddedHex.padEnd(reservedBytes * 2, '0');
        }
    }

    static numberToPaddedHex(
        input: number,
        reservedBytes: number,
        addAtEnd: boolean = true
    ): string {
        let paddedHex = this.numberToHex(input);
        if (addAtEnd) {
            return paddedHex.padStart(reservedBytes * 2, '0');
        } else {
            return paddedHex.padEnd(reservedBytes * 2, '0');
        }
    }

    static booleanToHex(
        value: boolean,
        reservedBytes: number,
        addAtEnd: boolean = true
    ): string {
        return this.numberToPaddedHex(value ? 1 : 0, reservedBytes, addAtEnd);
    }

    static getEmptyBytes(byteCount: number): string {
        return '00'.repeat(byteCount);
    }
}
