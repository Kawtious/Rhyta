export enum Order {
    ASC = 'ASC',
    DESC = 'DESC'
}

export class PageOptionsDto {
    readonly order?: Order = Order.ASC;

    readonly page?: number = 1;

    readonly take?: number = 10;

    get skip(): number {
        // @ts-ignore
        return (this.page - 1) * this.take;
    }
}
