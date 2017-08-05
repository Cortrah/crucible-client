export class CommandQueue {

    constructor (playHead = 0, commands = []) {
        this.playhead = playHead;
        this.commands = commands;
    }

    queueCommand(command) {
        this.commands.push(command);
    }

    gogo() {
        console.log("doing");
        if(this.playhead < this.commands.length){
            let command = this.commands[this.playhead];
            command.do();
            if(this.playhead < this.commands.length + 1) {
                this.playhead++;
            }
        }
    }

    ungo() {
        console.log("undoing");
        let command = this.commands[this.playhead];
        command.undo();
        if(this.playhead > 0){
            this.playhead--;
        }
    }

}