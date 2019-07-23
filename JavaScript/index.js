for (let index = 0; index < 100; index++) {
  var str = `
<h2 style="color:#0269c8;" id="${index}">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#${index}" ><b>返回</b></a></p>
</details>\n\n`
  console.log(str);
}