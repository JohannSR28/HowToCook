import os

def print_tree(dir_path, exclude=[], indent=""):
    """
    Affiche la structure du dossier sous forme d'arbre, en excluant certains dossiers ou fichiers.

    :param dir_path: Chemin du dossier à analyser.
    :param exclude: Liste des noms de dossiers ou fichiers à exclure.
    :param indent: Niveau d'indentation (utilisé pour l'affichage).
    """
    try:
        # Liste les fichiers et dossiers, tout en filtrant ceux à exclure
        items = sorted(item for item in os.listdir(dir_path) if item not in exclude)
        for index, item in enumerate(items):
            item_path = os.path.join(dir_path, item)
            is_last = index == len(items) - 1
            # Affiche avec une branche correcte (├── ou └──)
            branch = "└── " if is_last else "├── "
            print(f"{indent}{branch}{item}")
            # Si c'est un dossier, explorer récursivement
            if os.path.isdir(item_path):
                new_indent = indent + ("    " if is_last else "│   ")
                print_tree(item_path, exclude, new_indent)
    except PermissionError:
        print(f"{indent}└── [Permission Denied]")

def main():
    # Dossier racine (dossier courant ou ouvert dans VS Code)
    workspace_folder = os.getenv("PWD", os.getcwd())
    print(f"Dossier racine : {workspace_folder}")

    # Liste des noms de dossiers ou fichiers à exclure
    exclude_list = ["node_modules", ".git", "__pycache__","dist"]

    # Génère l'arborescence
    print_tree(workspace_folder, exclude=exclude_list)

if __name__ == "__main__":
    main()


