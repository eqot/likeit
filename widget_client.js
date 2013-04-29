window.likeitWidget = {
    style: 'position:absolute;top:0px;right:0px;font-size:3em',
    init: function () {
        var socket = io.connect('http://localhost:8081/', {resource: 'likeit'});
        var style = this.style;
        socket.on('connect', function () {
            var head = document.getElementsByTagName('head')[0];
            var body = document.getElementsByTagName('body')[0];
            var like = document.getElementById('like-count');
            var viewer = document.getElementById('viewer-count');
            if (!like) {
                head.innerHTML += '<style>#likeit {' + style + '}</style>' + head.innerHTML;
                body.innerHTML += '<div id="likeit"><span id="like-count">0</span> Like / <span id="viewer-count">0</span> Viewer</div>';
                like = document.getElementById('like-count');
                viewer = document.getElementById('viewer-count');
            }
            socket.on('like', function (count) {
                likeit.innerHTML = count;
            });
            socket.on('viewer', function (count) {
                viewer.innerHTML = count;
            });
        });
    }
}
