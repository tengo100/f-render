export default {
  save: `function save(data) {
    fetch("/xlyk-api/hrmanage/bsform/findAll", {
        method: "post",
        headers: {
            "X-Token": sessionStorage.getItem("X-Token"),
            "Content-Type": "application/json"
        },
        body: data
    }).then(response => response.json()).then(rs => {
        console.log(rs)
        this.$message.success("保存成功")
    })
return false
}`,
  select: `async (data) => {
            const res = await fetch(
            //修改下方的接口地址
             "/xlyk-api/hrmanage/bsform/findAll",
              {
                method: "post",
                headers: {
                  "X-Token": sessionStorage.getItem("X-Token"),
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({})//这里放请求参数
              }
            ).then(response => response.json());
            return res.data;
          }`,
  linkValue:`(data, formData) => {
  // data为下拉选中的行数据，formData为表单的对象，可以把data的值带给formData赋值
    this.$set(formData, 'hrlngemployeeid', data.lngbsformid)
    this.$set(formData, 'hrstartdate', '2024-11-08')
}`
};
