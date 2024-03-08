import {Component, Input} from '@angular/core';
import {Message} from '../../models/message';

@Component({ template: '' })
export abstract class BaseMessageComponent {
  @Input() message: Message;
  textSend: boolean;

  ngOnInit(): void {
    this.textSend = this.isFromAnna();
  }

  protected isFromAnna(): boolean {
    return this.message.from === 'Anna';
  }
}
