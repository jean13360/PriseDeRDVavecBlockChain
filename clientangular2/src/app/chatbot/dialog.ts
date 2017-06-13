
export class Dialogue {
    public style;
    public icon;
    public text;
    public user:boolean = false;
    constructor () {}
    addUserText(dialogue: string) {
        this.text = dialogue;
        this.style = 'text-align: left';
        this.icon = 'account_box';
        this.user = true;
    }

     addBotText(dialogue: string) {
        this.text = dialogue;
        this.style = 'text-align: right';
        this.icon = 'android';
        this.user = false;
    }
}