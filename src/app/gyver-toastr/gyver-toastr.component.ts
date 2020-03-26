import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'toastr',
  templateUrl: './gyver-toastr.component.html',
  styleUrls: ['./gyver-toastr.component.scss']
})
export class GyverToastrComponent implements OnInit {

  showToastr:boolean;
  message:SafeHtml;
  style:SafeStyle;
  id:any;

  static instance:GyverToastrComponent;

  constructor(private dom:DomSanitizer) {
    GyverToastrComponent.instance=this;
    console.log(GyverToastrComponent.instance.showToastr);
  }

  ngOnInit() {

  }
  

  static displayModalWithType(message:string,modalType?:ModalType)
  {
    if(modalType==undefined)
      modalType=ModalType.SUCCESS;
    GyverToastrComponent.setModalType(modalType);
    GyverToastrComponent.displayModal(message);
  }

  static displayModal(message:string)
  {
    var instance=GyverToastrComponent.instance;
    instance.message=instance.dom.bypassSecurityTrustHtml(message);
    instance.showToastr=true;
    instance.id=setTimeout(()=>{
      instance.showToastr=false;
      clearTimeout(instance.id);
    },10000);
  }

  static setModalType(modalType:ModalType)
  {
    var instance=GyverToastrComponent.instance;
    switch(modalType)
    {
      case ModalType.ERROR:
        instance.style=instance.dom.bypassSecurityTrustStyle("toastr-container red-toastr");
        break;
      case ModalType.NORMAL:
        instance.style=instance.dom.bypassSecurityTrustStyle("toastr-container white-toastr");
        break;
      case ModalType.SUCCESS:
          instance.style=instance.dom.bypassSecurityTrustStyle("toastr-container blue-toastr");
          break;
      case ModalType.WARNING:
        instance.style=instance.dom.bypassSecurityTrustStyle("toastr-container yellow-toastr");
        break;
      default:
        instance.style=instance.dom.bypassSecurityTrustStyle("toastr-container white-toastr");
        break;
    }
  }

  static hideModal()
  {
    GyverToastrComponent.instance.showToastr=false;
  }
}

export enum ModalType{
  NORMAL,
  WARNING,
  ERROR,
  SUCCESS
}