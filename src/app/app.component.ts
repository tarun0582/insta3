import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'instagram';

public textArea: string = '';
public isEmojiPickerVisible: boolean | undefined;
addEmoji(event:any) {
  this.textArea = `${this.textArea}${event.emoji.native}`;
  this.isEmojiPickerVisible = false;
}
}
