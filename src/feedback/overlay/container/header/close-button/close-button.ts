import { fromEvent } from 'rxjs';
import { TypeButton, Cursor, StylePosition } from 'type-dom.ts';
import { TdCloseSvg } from 'type-dom-svgs';
import { OverlayHeader } from '../header';

export class CloseButton extends TypeButton {
  className: 'CloseButton';
  childNodes: [TdCloseSvg];
  private readonly svg: TdCloseSvg;

  constructor(public parent: OverlayHeader) {
    super();
    this.className = 'CloseButton';
    this.propObj = {
      styleObj: {
        cursor: Cursor.pointer,
        position: StylePosition.absolute,
        top: '20px',
        right: '20px',
        padding: '0',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        fontSize: '16px',
      },
      attrObj: {
        name: 'close-button',
      }
    };

    this.svg = new TdCloseSvg(this);
    this.childNodes = [this.svg];

    this.initEvents();
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.dom, 'click').subscribe(() => {
        this.parent.parent.parent.hide();
      }),
    );
  }
}