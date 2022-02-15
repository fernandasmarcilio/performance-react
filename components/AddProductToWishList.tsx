export interface AddProductToWishListProps {
  onAddToWishList: () => void;
  onRequestClose: () => void;
}

export function AddProductToWishList({ onAddToWishList, onRequestClose }: AddProductToWishListProps) {
  return (
    <span>
      Deseja adicionar aos favoritos?
      <button onClick={onRequestClose}>Não</button>
      <button onClick={onAddToWishList}>Sim</button>
    </span>
  )
}