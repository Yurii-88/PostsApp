import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../model/interfaces';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() post!: Post;
  @Output() onRemove = new EventEmitter<void>();

  constructor() { }

  removePost(): void {
    this.onRemove.emit();
  }
}
