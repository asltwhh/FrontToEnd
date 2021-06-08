
### video元素
    - <video controls autoplay width="512" height="288">
		<source src="video/tweetsip.mp4">
		<source src="video/tweetsip.webm">
		<source src="video/tweetsip.ogv">
        <object>...</object>
		<p>Sorry, your browser doesn't support the video element.</p>
	  </video>
<video controls autoplay width="512" height="288">
		<source src="video/tweetsip.mp4">
		<source src="video/tweetsip.webm">
		<source src="video/tweetsip.ogv">
        <object>...</object>
		<p>Sorry, your browser doesn't support the video element.</p>
	  </video>
          - contols属性会为视频提供一些控制播放的控件，不同的浏览器增加的控件不同
          - autoplay会控制一旦页面加载就会自动播放视频，这两种属性是布尔属性，一旦存在，就会产生效果
          - poster属性：当视频未加载时就会将这个图片作为封面
          - object属性播放flash视频
    - 由于视频有好多种格式，为了保证浏览器可以完全识别，我们加入了三种视频格式
    - 这里已经定义了video窗口的大小，如果不需要添加其他的css格式，就可以不添加css

### video的其他属性
    - loop:布尔属性，当存在时，会自动循环播放视频
    - preload属性：在播放视频之前加载视频的内容或者元数据
        - preload:none;在播放之前不加载视频
        - preload:metadata;在播放之前加载元数据
        - preload:auto;在播放之前浏览器自动选择

### 几种常见的视频格式：
    - 主流浏览器主要有三种视频格式：
        - WebM容器：包含vp8视频编码和Vorbis音频编码
        - MP4容器：H.264视频编码和AAC音频编码
        - Ogg容器：Theora视频编码和Vorbis音频编码

## audio元素
    <audio controls src="song.mp3">
      Sorry, your browser doesn't support the video element.</p>
    </audio>
<audio controls src="song.mp3">
  Sorry, your browser doesn't support the video element.</p>
</audio>


        
