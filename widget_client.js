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
                body.innerHTML += '<div id="likeit"><span id="like-count">0</span> Likes / <span id="viewer-count">0</span> Viewers</div>';
                like = document.getElementById('like-count');
                viewer = document.getElementById('viewer-count');
            }

            var likeit = document.getElementById('likeit');
            likeit.addEventListener('click', function () {
                socket.emit('like');
            });

            document.onkeydown = function (event) {
                // if (event.keyCode === 32) { // Space key
                if (event.keyCode === 13) { // Return key
                    event.preventDefault();

                    socket.emit('like');
                }
            };

            socket.on('like', function (count) {
                like.innerHTML = count;
            });
            socket.on('viewer', function (count) {
                viewer.innerHTML = count;
            });
        });
    }
}
