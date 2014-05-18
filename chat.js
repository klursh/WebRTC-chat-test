var API_KEY = '0juahvicmwvcxr';
var myid, destid; // 読み込み元のhtmlファイルでセット

window.onload = function() {
    __addEventListener(__('connect'), 'click', connect);
    __addEventListener(__('submit'), 'click', sendMsg);
    __addEventListener(__('msg'), 'keydown', function(e) {
        if (e.keyCode === 13) {
            sendMsg();
        }
    });
    
    var peer = new Peer(myid, {key: API_KEY});
    var connection;
    
    peer.on('connection', function(conn) {
        connection = conn;
        console.log('接続を受けました。');
        connected();
    });
    
    function connect() {
        connection = peer.connect(destid);
        console.log('接続を開始します。');
        connected();
    }
    function connected() {
        __('connect').setAttribute('disabled', 'disabled');
        connection.on('data', function(msg) {
            console.log(destid + ': ' + msg);
        });
    }
    function sendMsg() {
        var msg = __('msg').value;
        if (connection) {
            connection.send(msg);
            console.log('you: ' + msg);
            __('msg').value = '';
        }
        else {
            console.log('接続されていません');
        }
    }
};


function __(id) {
    return document.getElementById(id);
}
function __addEventListener(elem, type, fn) {
    if (window.addEventListener) {
        elem.addEventListener(type, fn, false);
    }
    else if (window.attachEvent) {
        elem.attachEvent('on' + type, fn);
    }
    else {
        elem['on' + type] = fn;
    }
}
function __removeEventListener(elem, type, fn) {
    if (window.removeEventListener) {
        elem.removeEventListener(type, fn, false);
    }
    else if (window.detachEvent) {
        elem.detachEvent('on' + type, fn);
    }
    else {
        elem['on' + type] = void 0;
    }
}
