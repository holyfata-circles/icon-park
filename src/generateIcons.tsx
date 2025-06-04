import path from 'path';
import ejs from 'ejs';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';

// 将连字符转换为首字母大写的驼峰命名
const toCamelCase = (str: string): string => {
    return str
        .split('-')
        .map((word, index) => {
            if (index === 0) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('');
};

const main = () => {
    const outputDir = path.join(__dirname, '..', 'output');
    const iconsDir = path.join(__dirname, 'icons');

    // 删除icons目录下的所有文件
    if (existsSync(iconsDir)) {
        const files = readdirSync(iconsDir);
        for (const file of files) {
            const filePath = path.join(iconsDir, file);
            if (filePath !== __filename) { // 确保不删除当前脚本文件
                writeFileSync(filePath, ''); // 清空文件内容
            }
        }
    } else {
        // 如果目录不存在，则创建目录
        mkdirSync(iconsDir, { recursive: true });
    }
    
    const files = readdirSync(outputDir);
    const total = files.length;
    let count = 0;
    for (const file of files) {
        count++;
        console.log(`${count}/${total} ${file}`);

        const fileName = file.split('.')[0];
        const comName = toCamelCase(fileName);
        console.log('转换后的驼峰命名:', comName);
        // // 读取模板文件
        const template = readFileSync(path.join(__dirname, 'template.ejs'), 'utf8');
        // // 渲染数据
        const data = { name: file, comName };
        const content = ejs.render(template, data);

        writeFileSync(path.join(iconsDir, `${comName}.tsx`), content);
    }
}

main()
