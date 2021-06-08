### 1 Number.prototype.toString(radix)

```
将数字转换为字符串
	radix指定要用于数字到字符串的转换的基数(从2到36)。如果未指定 radix 参数，则默认值为 10。
```

### 2 String.prototype.match(reg)

```
如果没有匹配到，则返回null

例如:'1011011'.match(/1{2}/g)     ['11','11']
	'1011011'.match(/1{3}/g)      null   并不是空数组喔
```

