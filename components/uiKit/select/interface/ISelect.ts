export interface IOption{
    value: number;
    label: string;
}
export interface ISelect{
    optionItem:IOption[],
    placeholder?:string;
    selectClassName?:string;
    optionClassName?:string;
    onChange:any;
    Id:string[] | undefined;
    checkSelected:boolean;
    size?: 'small' | 'middle' | 'large' | undefined;
} 
