import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../../models/message';
import { MessagingService } from '../../services/messaging.service';
import { TextMessage } from '../../models/text-message';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent {
  private subscription: Subscription;
  messages: Message[];
  constructor(private messagingService: MessagingService) { }

  ngOnInit(): void {
    this.subscription = this.messagingService.messages$.subscribe((messages: Message[]) => {
      this.messages = messages.filter(message => message instanceof TextMessage) as TextMessage[];
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
