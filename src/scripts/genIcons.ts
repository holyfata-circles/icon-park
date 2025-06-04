import path from 'path';
import ejs from 'ejs';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';

/**
 * 将连字符字符串转换为首字母大写的驼峰命名
 * 例如：'icon-home' => 'IconHome'
 */
const toCamelCase = (str: string): string =>
    str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');

const main = () => {
    const outputDir = path.join(__dirname, '../output');
    const iconsDir = path.join(__dirname, '../icons');

    // 若 icons 目录不存在则创建，存在则清空目录下所有文件
    if (!existsSync(iconsDir)) {
        mkdirSync(iconsDir, { recursive: true });
    } else {
        for (const file of readdirSync(iconsDir)) {
            writeFileSync(path.join(iconsDir, file), ''); // 清空文件内容
        }
    }

    // 遍历 output 目录下的所有文件，生成对应的 tsx 组件
    const files = readdirSync(outputDir);
    files.forEach((file, idx) => {
        const fileName = file.split('.')[0];
        const comName = toCamelCase(fileName);
        console.log(`${idx + 1}/${files.length} 生成组件: ${comName}`);

        const template = readFileSync(path.join(__dirname, '../templates/Icon.tsx.ejs'), 'utf8');
        const content = ejs.render(template, { name: file, comName });

        writeFileSync(path.join(iconsDir, `${comName}.tsx`), content);
    });
};

main();
