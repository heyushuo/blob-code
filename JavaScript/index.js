for (let index = 0; index < 100; index++) {
  var str = `
#
<p id="${index}"></p>

### [](#${index})
<details>
<summary><b>查看解析</b></summary>

<p><a href="#${index}" ><b>返回</b></a></p>
</details>\n
#\n\n
`
  console.log(str);
}