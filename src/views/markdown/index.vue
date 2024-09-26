<template>
  <el-card />
  <div class="md">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>粘贴HTML</span>
        </div>
      </template>
      <el-row>
        <el-col :span="24">
          <el-input
            v-model="textarea"
            placeholder="请粘贴数据"
            rows="4"
            show-word-limit
            type="textarea"
          />
        </el-col>
        <div class="operation">
          <el-button type="primary" class="button" @click="onSave">
            转换
          </el-button>
        </div>
      </el-row>
    </el-card>
    <div v-if="editor">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>内容识别</span>
            <el-space>
              <el-button
                class="button"
                text
                @click="editor.chain().focus().mergeCells().run()"
                :disabled="!editor.can().mergeCells()"
              >
                合并
              </el-button>
              <el-button
                class="button"
                text
                @click="editor.chain().focus().splitCell().run()"
                :disabled="!editor.can().splitCell()"
              >
                拆分
              </el-button>
              <el-button class="button" text @click="onCopy">
                复制HTML
              </el-button>
            </el-space>
          </div>
        </template>
        <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :preview-src-list="[url]"
          :initial-index="4"
          fit="cover"
        />
        <editor-content :editor="editor" />
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";

import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { ElMessage } from "element-plus";

// 自定义TableCell扩展
const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => ({
          "data-background-color": attributes.backgroundColor,
          style: `background-color: ${attributes.backgroundColor}`,
        }),
      },
    };
  },
});

// 使用ref来创建响应式的数据
const editor = ref(null);

// 使用md来创建响应式的数据
const textarea = ref("");
const url = ref("");
const onSave = (e, value) => {
  if (textarea.value) {
    const list = JSON.parse(textarea.value);
    console.log(list);
    url.value = list[0]?.value;
    editor.value.commands.setContent(list[1]?.value);
  } else {
    ElMessage({
      message: "请输入要转换的数据",
      type: "warning",
    });
  }
};
// 复制HTML
const onCopy = () => {
  console.log(editor.value.getHTML());
  navigator.clipboard.writeText(editor.value.getHTML());
  ElMessage.success("内容已复制到剪贴板！");
};
// 初始化编辑器
onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      Image,
      Highlight,
      Typography,
      TableHeader,
      CustomTableCell,
    ],
    content: ``,
  });
});

// 销毁编辑器
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>
<style lang="scss">
.box-card {
  margin-bottom: 20px;
}

.md {
  padding: 10px;

  .operation {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 10px;
  }
}

.container {
  width: 100%;
  background: red;
}

/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 2.5rem;
    line-height: 1.1;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    padding: 0.25em 0.3em;
    font-size: 0.85rem;
    color: var(--black);
    background-color: var(--purple-light);
    border-radius: 0.4rem;
  }

  pre {
    padding: 0.75rem 1rem;
    margin: 1.5rem 0;
    font-family: JetBrainsMono, monospace;
    color: var(--white);
    background: var(--black);
    border-radius: 0.5rem;

    code {
      padding: 0;
      font-size: 0.8rem;
      color: inherit;
      background: none;
    }
  }

  blockquote {
    padding-left: 1rem;
    margin: 1.5rem 0;
    border-left: 3px solid var(--gray-3);
  }

  hr {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid var(--gray-2);
  }

  /* Table-specific styling */
  table {
    width: 100%;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    border-collapse: collapse;

    td,
    th {
      position: relative;
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      vertical-align: top;
      border: 1px solid var(--gray-3);

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: var(--gray-1);
    }

    .selectedCell::after {
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      content: "";
      background: var(--gray-2);
    }

    .column-resize-handle {
      position: absolute;
      top: 0;
      right: -2px;
      bottom: -2px;
      width: 4px;
      pointer-events: none;
      background-color: var(--purple);
    }
  }

  .tableWrapper {
    margin: 1.5rem 0;
    overflow-x: auto;
  }

  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
