# Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

<el-container>：外层容器。 当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列， 否则会水平左右排列。

<el-header>：顶栏容器。

<el-aside>：侧边栏容器。

<el-main>：主要区域容器。

<el-footer>：底栏容器。

TIP
``` 
以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。 此外， <el-container>的直接子元素必须是后四个组件中的一个或多个。 后四个组件的亲元素必须是一个 <el-container>
```
