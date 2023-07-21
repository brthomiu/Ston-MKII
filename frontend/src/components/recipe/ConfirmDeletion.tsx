import {
  handleDeleteRecipe,
  handleRemoveProfileRecipe,
} from '../../features/recipeService';
import { IRecipe } from '../../types/recipeTypes';

type Props = {
  recipe: IRecipe;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  toggleReload: () => void;
};

export default function ConfirmDeletion({
  recipe,
  setShowModal,
  setShowConfirmation,
  toggleReload,
}: Props) {
  // Function to delete recipe and close the modal
  const deleteRecipe = (recipeData: IRecipe) => {
    try {
      handleRemoveProfileRecipe(recipeData);
      handleDeleteRecipe(recipeData.recipeId);
      setShowConfirmation(false);
      setShowModal(false);
      toggleReload();
    } catch (error) {
      throw Error('Could not delete recipe');
    }
  };

  return (
    <>
      <p>
        Are you sure you want to delete this recipe? There will be no going
        back!
      </p>
      <button type="button" onClick={() => setShowConfirmation(false)}>
        Go Back
      </button>
      <button type="button" onClick={() => deleteRecipe(recipe)}>
        Delete
      </button>
    </>
  );
}
