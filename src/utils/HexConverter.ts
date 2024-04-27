export class HexConverter {
    static stringToHex(input: string): string {
        return Array.from(input)
            .map((char) => char.charCodeAt(0).toString(16))
            .join('');
    }

    static numberToHex(input: number): string {
        return input.toString(16);
    }

    static hexToString(hex: string): string {
        let str = '';
        for (let i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return str;
    }

    static hexToBytes(hex: string): number[] {
        const bytes = [];
        for (let i = 0; i < hex.length; i += 2) {
            bytes.push(parseInt(hex.substr(i, 2), 16));
        }
        return bytes;
    }

    static stringToHexWithNullTerminator(input: string): string {
        if (!input.endsWith('\x00')) {
            input += '\x00';
        }
        return this.stringToHex(input);
    }

    static stringToPaddedHex(
        input: string,
        paddingPairs: number,
        addAtEnd: boolean = true
    ): string {
        let paddedHex = this.stringToHex(input);
        if (addAtEnd) {
            paddedHex += '00'.repeat(paddingPairs);
        } else {
            paddedHex = '00'.repeat(paddingPairs) + paddedHex;
        }
        return paddedHex;
    }

    static numberToPaddedHex(
        input: number,
        paddingPairs: number,
        addAtEnd: boolean = true
    ): string {
        let paddedHex = this.numberToHex(input);
        if (addAtEnd) {
            paddedHex += '00'.repeat(paddingPairs);
        } else {
            paddedHex = '00'.repeat(paddingPairs) + paddedHex;
        }
        return paddedHex;
    }

    static booleanToHex(
        value: boolean,
        paddingPairs: number,
        addAtEnd: boolean = true
    ): string {
        return this.numberToPaddedHex(value ? 1 : 0, paddingPairs, addAtEnd);
    }

    static getEmptyBytes(byteCount: number): string {
        return '00'.repeat(byteCount);
    }
}
