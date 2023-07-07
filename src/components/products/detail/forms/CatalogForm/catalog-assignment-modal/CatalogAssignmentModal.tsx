import {Button, ButtonProps, MenuItem, MenuItemProps, Modal, ModalOverlay, useDisclosure} from "@chakra-ui/react"
import {CatalogAssignmentModalContent} from "./CatalogAssignmentModalContent"
import {ProductCatalogAssignment} from "ordercloud-javascript-sdk"

interface CatalogAssignmentModalProps {
  onUpdate: (catalogAssignments: ProductCatalogAssignment[]) => void
  catalogAssignments?: ProductCatalogAssignment[]
  buttonProps?: ButtonProps
  menuItemProps?: MenuItemProps
  as: "button" | "menuitem"
}

export function CatalogAssignmentModal({
  buttonProps,
  menuItemProps,
  onUpdate,
  catalogAssignments,
  as
}: CatalogAssignmentModalProps) {
  const {isOpen, onOpen, onClose} = useDisclosure()

  const handleCancel = () => {
    onClose()
  }

  const onSubmit = (data: ProductCatalogAssignment[]) => {
    onUpdate(data)
    onClose()
  }

  return (
    <>
      {as === "button" ? (
        <Button {...buttonProps} onClick={onOpen}>
          {buttonProps.children || "Add catalog assignment"}
        </Button>
      ) : (
        <MenuItem onClick={onOpen} {...menuItemProps} />
      )}

      <Modal size="3xl" isOpen={isOpen} onClose={handleCancel}>
        <ModalOverlay />
        <CatalogAssignmentModalContent
          catalogAssignments={catalogAssignments}
          onUpdate={onSubmit}
          onCancelModal={handleCancel}
        ></CatalogAssignmentModalContent>
      </Modal>
    </>
  )
}
