export interface IconProps {
  /**
   * Tamanho do ícone em pixels ou string CSS
   * @default 24
   */
  size?: number | string;
  
  /**
   * Cor do ícone (fill e stroke)
   * @default "currentColor"
   */
  color?: string;
  
  /**
   * Classes CSS adicionais
   */
  className?: string;
  
  /**
   * Título acessível para o ícone
   */
  title?: string;
  
  /**
   * Propriedades HTML padrão para SVG
   */
  [key: string]: any;
}

export interface IconWithStrokeProps extends IconProps {
  /**
   * Largura da linha do stroke
   * @default 2
   */
  strokeWidth?: number | string;
} 