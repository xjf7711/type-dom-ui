import { fromEvent } from 'rxjs';
import { TypeButton, TextNode, Span, TypeHtml, Slot, StyleCursor, XElement } from 'type-dom.ts';
import { $iconLeft, $iconLoading, $iconRight } from '../td-icon/td-icon.style';
import { $borderRadius, $button, $buttonPaddingVertical } from '../../style/var';
import { TdIcon } from '../td-icon/td-icon.class';
import { IButtonType, ITdButton, ITdButtonConfig } from './td-button.interface';
import { $buttonPlainColors, $buttonStateColors, sizeOpts, tdButtonBase } from './td-button.style';
export class TdButton extends TypeButton implements ITdButton {
  className: 'TdButton';
  parent?: TypeHtml | XElement;
  childNodes: (Span | TdIcon)[];
  span: Span;
  textNode: TextNode;
  // template: Template;
  private type?: IButtonType;
  private plain?: boolean;
  private disabled?: boolean;
  constructor(config?: Partial<ITdButtonConfig>) {
    super();
    this.className = 'TdButton';
    // this.template = new Template(this);
    this.span = new Span(this);
    this.span.addStyleObj({
      display: 'inline-flex',
      alignItems: 'center',
    });
    this.textNode = new TextNode();
    this.span.addChild(this.textNode);
    const slot = new Slot(this.span);
    this.span.addChild(slot);
    this.childNodes = [this.span];
    this.setConfig(config);
  }
  setConfig(config?: Partial<ITdButtonConfig>): void {
    this.addStyleObj(tdButtonBase);
    if (config?.title) {
      this.textNode.setText(config.title);
    }
    if (config?.SvgClass) {
      const icon = new TdIcon({
        SvgClass: config.SvgClass,
      });
      if (config.iconPosition === 'right') {
        icon.addStyleObj($iconRight);
        this.addChild(icon);
      } else {
        if (config.title) {
          icon.addStyleObj($iconLeft);
        }
        // else {
        //   icon.addStyleObj()
        // }
        this.unshiftChild(icon);
      }
      if (config.loading) {
        icon.addStyleObj($iconLoading);
      }
    }
    // const type = config?.type ? config.type : 'default';
    // this.type = type;
    if (config?.type) {
      this.type = config.type;
      if (config?.plain) {
        console.log('config.plain . ');
        this.plain = config.plain;
        if (config.disabled) {
          this.addStyleObj($buttonPlainColors[config.type].disabled);
        } else {
          console.log($buttonPlainColors[config.type].default);
          this.addStyleObj($buttonPlainColors[config.type].default);
        }
      } else {
        if (config?.disabled) {
          console.log('config?.disabled is true . $button.disabled is ', $button.disabled);
          this.disabled = config.disabled;
          this.addStyleObj($buttonStateColors[config.type].disabled);
        } else {
          this.addStyleObj($buttonStateColors[config.type].default);
        }
      }
    }
    const size = config?.size ? config.size : 'middle';
    this.addStyleObj(sizeOpts[size]);
    if (config?.round) {
      this.addStyleObj({
        borderRadius: $borderRadius.round,
      });
    } else if (config?.circle) {
      this.addStyleObj({
        borderRadius: $borderRadius.circle,
        padding: $buttonPaddingVertical.default
      });
    }
  }
  // 悬浮、聚焦、激活状态样式
  initEvents() {
    this.events.push(
      fromEvent(this.dom, 'mouseover').subscribe(() => {
        if (this.disabled) {
          this.setStyleObj({
            cursor: StyleCursor.notAllowed
          });
        } else {
          if (this.type) {
            this.setStyleObj($buttonStateColors[this.type].hover);
          } else {
            this.setStyleObj({
              color: $button.hover.textColor,
              backgroundColor: $button.hover.borderColor, // $colors['primary']['light-3'],
              borderColor: $button.hover.borderColor,
            });
          }
        }
      }),
      fromEvent(this.dom, 'mouseout').subscribe(() => {
        if (this.disabled) {
          this.setStyleObj({
            cursor: StyleCursor.auto,
          });
        } else {
          if (this.type) {
            if (this.plain) {
              this.setStyleObj($buttonPlainColors[this.type].default);
            } else {
              this.setStyleObj($buttonStateColors[this.type].default);
            }
          } else {
            this.setStyleObj({
              color: $button.textColor,
              backgroundColor: $button.bgColor,
              borderColor: $button.borderColor,
            });
          }
        }
      })
    );
  }
}
