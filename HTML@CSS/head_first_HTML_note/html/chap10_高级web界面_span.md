
## span
    - 创建内联字符和元素的逻辑分组
    - 例如，对于下面的内容，如果我们想将前面的音乐名变成斜体，后面的音乐家名变成粗体，就需要使用span
        <ul>
            <li>Buddha Bar, Claude Challe</span></li>
            <li>When It Falls, Zero 7</li>
            <li>Earth 7, L.T.J. Bukem</li>
            <li>Le Roi Est Mort, Vive Le Roi!, Enigma</li>
            <li>Music for Airports, Brian Eno</li>
        </ul>
    - 修改：
        <ul>
            <li><span id="music">Buddha Bar</span>,<span id="musician">Claude Challe</span></li>
        </ul>
    - 然后在css中：
        .music{
            font-style:Italic;
        }
        .musician{
            font-weight:bold;
        }
            
           
