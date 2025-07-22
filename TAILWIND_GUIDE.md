# 🎨 Guia Tailwind CSS - Projeto Cubos Movies

## 📱 **Classes Responsivas Utilizadas**

### **Breakpoints do Tailwind**
- `sm:` - 640px e acima (tablets pequenos)
- `md:` - 768px e acima (tablets)  
- `lg:` - 1024px e acima (desktops pequenos)
- `xl:` - 1280px e acima (desktops)
- `2xl:` - 1536px e acima (desktops grandes)

### **🏗️ Layout e Estrutura**

#### Grid Responsivo
```html
<!-- Grid que se adapta por tela -->
<div className="
  grid grid-cols-1           // 1 coluna no mobile
  sm:grid-cols-2            // 2 colunas no tablet pequeno  
  lg:grid-cols-3            // 3 colunas no desktop pequeno
  xl:grid-cols-4            // 4 colunas no desktop
  gap-6 sm:gap-8            // Espaçamento responsivo
">
```

#### Flexbox Responsivo
```html
<!-- Flex que muda direção -->
<div className="
  flex flex-col              // Vertical no mobile
  lg:flex-row               // Horizontal no desktop
  lg:items-center           // Alinhamento só no desktop
  lg:justify-between        // Espaçamento só no desktop
">
```

### **📐 Espaçamentos Responsivos**

#### Padding e Margin
```html
<div className="
  px-4 sm:px-6 lg:px-8      // Padding horizontal responsivo
  py-4 sm:py-6 lg:py-8      // Padding vertical responsivo
  mb-6 lg:mb-8              // Margin bottom responsivo
">
```

#### Container com Max Width
```html
<div className="
  max-w-7xl mx-auto         // Container centralizado
  px-4 sm:px-6 lg:px-8     // Padding lateral responsivo
">
```

### **🎯 Tipografia Responsiva**

#### Tamanhos de Texto
```html
<h1 className="
  text-2xl                  // 24px no mobile
  sm:text-3xl              // 30px no tablet
  lg:text-4xl              // 36px no desktop
  font-bold
">
```

#### Alinhamento
```html
<p className="
  text-center              // Centralizado no mobile
  lg:text-left             // Esquerda no desktop
">
```

### **🖼️ Imagens e Media**

#### Imagens Responsivas
```html
<img className="
  w-full                   // Largura total
  h-64 sm:h-80 lg:h-96    // Altura responsiva
  object-cover             // Cobertura da imagem
">
```

### **👻 Visibilidade Responsiva**

#### Mostrar/Esconder por Tela
```html
<!-- Elemento visível apenas em telas grandes -->
<span className="hidden lg:inline">Texto apenas desktop</span>

<!-- Elemento visível apenas em mobile -->
<span className="lg:hidden">Texto apenas mobile</span>
```

### **🎨 Cores Personalizadas (tailwind.config.js)**

#### Cores do Projeto
```javascript
colors: {
  primary: {
    500: '#007bff',    // Azul principal
    600: '#0056b3',    // Azul hover
  },
  dark: {
    bg: '#121212',     // Fundo dark mode
    surface: '#1e1e1e', // Superfície dark mode
    border: '#343a40',  // Borda dark mode
  },
  light: {
    bg: '#ffffff',     // Fundo light mode
    surface: '#f8f9fa', // Superfície light mode
    border: '#dee2e6',  // Borda light mode
  }
}
```

#### Como Usar as Cores
```html
<div className="
  bg-white dark:bg-dark-bg           // Fundo que muda com tema
  border-light-border dark:border-dark-border  // Borda responsiva
  text-gray-900 dark:text-white      // Texto que muda com tema
">
```

### **⚡ Classes de Transição**

#### Transições Suaves
```html
<button className="
  transition-all duration-200        // Transição geral
  hover:-translate-y-0.5            // Elevação no hover
  hover:shadow-lg                   // Sombra no hover
">
```

### **📦 Classes Utilitárias Personalizadas**

#### Componentes Reutilizáveis (em @layer components)
```css
.btn-primary {
  @apply bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed;
}

.input-field {
  @apply w-full px-3 py-3 border border-light-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-white;
}

.card {
  @apply bg-light-surface dark:bg-dark-surface rounded-xl shadow-card dark:shadow-card-dark transition-all duration-300;
}
```

### **🌟 Exemplos Práticos do Projeto**

#### Header Responsivo
```html
<div className="
  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4
  flex flex-col lg:flex-row lg:items-center lg:justify-between
  gap-4
">
```

#### Card de Filme
```html
<div className="
  group card card-hover
  overflow-hidden
  animate-fade-in
">
  <div className="
    relative w-full h-96 sm:h-80 lg:h-96
    overflow-hidden
  ">
    <img className="
      w-full h-full object-cover
      transition-transform duration-300
      group-hover:scale-105
    ">
  </div>
</div>
```

#### Formulário Responsivo
```html
<div className="
  min-h-screen flex flex-col items-center justify-center
  px-4 py-8 sm:px-6 lg:px-8
">
  <div className="
    bg-white dark:bg-dark-surface
    rounded-2xl shadow-2xl
    p-6 sm:p-8 w-full max-w-md
  ">
```

## 🚀 **Dicas para Desenvolver**

1. **Mobile First**: Sempre comece pensando no mobile e vá adicionando breakpoints
2. **Grupo Classes**: Use `group` para efeitos hover em elementos pai
3. **Dark Mode**: Use `dark:` prefix para estilos do tema escuro
4. **Debugging**: Use `border border-red-500` temporariamente para ver layouts
5. **IntelliSense**: Configure sua IDE para autocomplete do Tailwind

## 🎯 **Classes Mais Usadas**

### Layout
- `flex`, `grid`, `container`, `max-w-*`, `mx-auto`
- `items-center`, `justify-between`, `gap-*`

### Responsividade  
- `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- `hidden lg:block`, `lg:flex`, `sm:grid-cols-2`

### Espaçamentos
- `p-*`, `px-*`, `py-*`, `m-*`, `mx-*`, `my-*`
- `space-x-*`, `space-y-*`, `gap-*`

### Cores e Temas
- `bg-*`, `text-*`, `border-*`
- `dark:bg-*`, `dark:text-*`, `dark:border-*`

### Interatividade
- `hover:*`, `focus:*`, `active:*`, `group-hover:*`
- `transition-*`, `duration-*`, `ease-*` 