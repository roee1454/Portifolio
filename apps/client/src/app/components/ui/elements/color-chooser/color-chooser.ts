import { Component, effect, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';

const COLORS = [
    { name: 'Blue', value: '#2563eb', class: 'bg-blue-600' },
    { name: 'Orange', value: '#ea580c', class: 'bg-orange-600' },
    { name: 'Amber', value: '#d97706', class: 'bg-amber-600' },
    { name: 'Rose', value: '#e11d48', class: 'bg-rose-600' },
    { name: 'Green', value: '#16a34a', class: 'bg-green-600' },
    { name: 'Indigo', value: '#4f46e5', class: 'bg-indigo-600' },
    { name: 'Violet', value: '#7c3aed', class: 'bg-violet-600' },
];

const THEMES = [
    {
        name: 'Latte',
        colors: {
            '--color-bg-base': '#f9f2f5',
            '--color-bg-surface': '#f4f4f5',
            '--color-bg-container': '#f6f6f6',
            '--color-text-base': '#6c6f85',
            '--color-text-muted': '#71717a',
        }
    },
    {
        name: 'Frappe',
        colors: {
            '--color-bg-base': '#303446',
            '--color-bg-surface': '#292c3c',
            '--color-bg-container': '#232634',
            '--color-text-base': '#c6d0f5',
            '--color-text-muted': '#a5adce',
        }
    },
    {
        name: 'LazyVim',
        colors: {
            '--color-bg-base': '#1a1b26',
            '--color-bg-surface': '#24283b',
            '--color-bg-container': '#16161e',
            '--color-text-base': '#c0caf5',
            '--color-text-muted': '#565f89',
        }
    },
    {
        name: 'Jetbrains',
        colors: {
            '--color-bg-base': '#2b2b2b',
            '--color-bg-surface': '#313335',
            '--color-bg-container': '#3c3f41',
            '--color-text-base': '#a9b7c6',
            '--color-text-muted': '#606366',
        }
    }
];

@Component({
    selector: 'app-color-chooser',
    standalone: true,
    imports: [NgClass, NgIconsModule],
    templateUrl: './color-chooser.html',
})
export class ColorChooserComponent {
    protected colors = COLORS;
    protected themes = THEMES;
    protected selectedColor = signal<string>(COLORS[0].value);
    protected selectedTheme = signal<string>(THEMES[1].name);

    constructor() {
        const savedColor = localStorage.getItem('theme-primary');
        if (savedColor) {
            this.selectedColor.set(savedColor);
        }

        const savedTheme = localStorage.getItem('theme-base');
        if (savedTheme) {
            this.selectedTheme.set(savedTheme);
        }

        effect(() => {
            const color = this.selectedColor();
            document.documentElement.style.setProperty('--color-primary', color);
            localStorage.setItem('theme-primary', color);
        });

        effect(() => {
            const themeName = this.selectedTheme();
            const theme = THEMES.find(t => t.name === themeName);

            if (theme) {
                Object.entries(theme.colors).forEach(([property, value]) => {
                    document.documentElement.style.setProperty(property, value);
                });
                localStorage.setItem('theme-base', themeName);
            }
        });
    }

    setColor(colorCtx: { value: string }) {
        this.selectedColor.set(colorCtx.value);
    }

    setTheme(themeName: string) {
        this.selectedTheme.set(themeName);
    }
}
