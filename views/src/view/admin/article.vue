<template>
    <div class="admin-article">
        <h2 class="title">
            文章列表
        </h2>
        <div class="box">
            <div class="content">
                <div class="new">
                    <y-button>新建文章</y-button>
                </div>
                <div class="list">
                    <table>
                        <thead>
                            <tr>
                                <th width="20px"><y-checkbox></y-checkbox></th>
                                <th>文章标题</th>
                                <th>最近更新</th>
                                <th>文章状态</th>
                                <th>文章操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><y-checkbox></y-checkbox></td>
                                <td>6</td>
                                <td>7</td>
                                <td>8</td>
                                <td>8</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
.admin-main {
    .list {
        table {
            width: 100%;
            overflow: auto;
            thead{
                tr {
                    th{
                        padding: 4px 6px;
                        text-align: left;
                        font-weight: 400;
                        color: #9ba3af;
                    }
                }
            }
            tbody {
                border: 1px solid #e9e9e9;
                padding: 6px 0;
                tr {
                    padding: 6px 0;
                    td {
                        padding: 6px 0;
                        padding: 4px 6px;
                        text-align: left;
                        font-weight: 400;
                    }
                }
            }
        }
    }
}
</style>