var Dialog = function(){}

Dialog.prototype.errorTips = function ($dialog, $box, errTips) {
  clearTimeout(errTimer);

  var errTimer = null;
  var isHasErrNode = document.querySelector('.dialog.error');

  if (errTips instanceof Array ) {
    var i = 0,
        len = errTips.length,
        str = '';

    for (; i < len; i++) {
      str += (errTips[i] + '<br />')
    };

    $box.innerHTML = str
  } else {
    $box.innerHTML = errTips
  }

  $dialog.appendChild($box);
  !isHasErrNode && document.body.appendChild($dialog);

  errTimer = setTimeout(function () {
    $dialog.remove();
  }, 2000)
}

Dialog.prototype.$dialog = function (options) {
  var dftOptions = {
    el: '',
    type: 'currency',
    hasFooter: false,
    confirmBtn: '',
    cancelBtn: '',
    confirmClick: function(){},
    cancelClick: function(){},
    template: 'dialog'
  }

  var _opts = Object.assign({}, dftOptions, options)

  var oDialog = document.createElement('section');
  var dialogBox = document.createElement('div');
  
  oDialog.className = (_opts.el + ' dialog ' + _opts.type).trim();
  dialogBox.className = 'dialog-box dlg-container';
  
  // Error prompt
  if( _opts.type === 'error' ){
    this.errorTips(oDialog, dialogBox, _opts.template)
  } else {
    var dialogCloseIcon = document.createElement('i');
    var dialogContext = document.createElement('div');

    dialogCloseIcon.className = 'dialog-close';
    dialogContext.className = 'dialog-context text-center'

    // close button
    dialogCloseIcon.onclick = closeDialog

    dialogBox.appendChild(dialogCloseIcon)

    // If there is a bottom button
    if (_opts.hasFooter) {
      var dialogFonter = document.createElement('div');
      dialogFonter.className = 'dialog-footer';
      dialogBox.className = dialogBox.className + ' has-footer';
      dialogBox.appendChild(dialogFonter)
      
      // confirm bottom
      if (_opts.confirmBtn) {
        var dialogConfirm = document.createElement('button');
        dialogConfirm.innerHTML = _opts.confirmBtn;
        dialogConfirm.className = 'dialog-btn confirm';

        dialogConfirm.onclick = function(){
          !(_opts.confirmClick(oDialog) === false || _opts.confirmClick(oDialog) === 'undefined' )  && closeDialog()
        }

        dialogFonter.appendChild(dialogConfirm)
      }
      // Cancel button
      if (_opts.closeBtn) {
        var dialogCancel = document.createElement('button');
        dialogCancel.innerHTML = _opts.cancelBtn;
        dialogCancel.className = 'dialog-btn close';

        dialogCancel.onclick = function(){
          !(_opts.cancelClick(oDialog) === false || _opts.cancelClick(oDialog) === 'undefined' )  && closeDialog();
        }

        dialogFonter.appendChild(dialogCancel)
      }
    }

    dialogContext.innerHTML = _opts.template


    dialogBox.appendChild(dialogContext)
    oDialog.appendChild(dialogBox)
    document.body.appendChild(oDialog);

    function closeDialog(){
      oDialog.remove();
    }
  }

  return oDialog
}



export default new Dialog()
