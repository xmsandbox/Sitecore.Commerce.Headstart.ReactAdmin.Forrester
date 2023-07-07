import {EditIcon} from "@chakra-ui/icons"
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Button,
  ButtonGroup
} from "@chakra-ui/react"
import {Catalogs, ProductCatalogAssignment} from "ordercloud-javascript-sdk"
import {Control, FieldValues, UseFieldArrayReturn, useWatch} from "react-hook-form"
import {TbDotsVertical} from "react-icons/tb"
import {useEffect, useState} from "react"
import {CatalogAssignmentModal} from "./catalog-assignment-modal/CatalogAssignmentModal"

type EnhancedProductCatalogAssignment = ProductCatalogAssignment & {CatalogName: string}

interface CatalogsTableProps {
  control: Control<FieldValues, any>
  fieldArray: UseFieldArrayReturn<FieldValues, "CatalogAssignments", "id">
}

export function CatalogsTable({control, fieldArray}: CatalogsTableProps) {
  const {replace} = fieldArray
  const [enhancedCatalogAssignments, setEnhancedCatalogAssignments] = useState<EnhancedProductCatalogAssignment[]>([])
  const watchedFields = useWatch({control, name: "CatalogAssignments"}) as ProductCatalogAssignment[]

  useEffect(() => {
    // adds display name (CatalogName) to assignments
    async function buildDisplayValues() {
      const allCatalogIds = watchedFields.map((assignment) => assignment.CatalogID)
      const allCatalogs = allCatalogIds.length
        ? (await Catalogs.List({filters: {ID: allCatalogIds.join("|")}})).Items
        : []
      const responses = watchedFields.map((catalogAssignment) => {
        const catalog = allCatalogs.find((c) => c.ID === catalogAssignment.CatalogID)
        return {
          ...catalogAssignment,
          CatalogName: catalog?.Name
        }
      })
      setEnhancedCatalogAssignments(responses)
    }

    buildDisplayValues()
  }, [watchedFields])

  const getAssignmentsDisplay = (assignments: EnhancedProductCatalogAssignment[]) => {
    return (
      <>
        {assignments.length > 0 && (
          <ButtonGroup display="flex" flexWrap="wrap" gap={2} marginTop={2}>
            {assignments.map((assignment, index) => (
              <Button
                key={index}
                variant="solid"
                fontWeight={"normal"}
                size="sm"
                borderRadius={"full"}
                backgroundColor="primary.100"
                margin={0}
                cursor="default"
                _hover={{backgroundColor: "primary.100"}}
              >
                {assignment.CatalogName}
              </Button>
            ))}
          </ButtonGroup>
        )}
      </>
    )
  }

  return (
    <TableContainer whiteSpace="pre-wrap" maxWidth="fit-content" minWidth="350px">
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Assigned To</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{getAssignmentsDisplay(enhancedCatalogAssignments)}</Td>
            <Td>
              <CatalogsActionMenu catalogAssignments={enhancedCatalogAssignments} onUpdate={replace} />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

interface CatalogsActionMenuProps {
  catalogAssignments: ProductCatalogAssignment[]
  onUpdate: (newCatalog: ProductCatalogAssignment[]) => void
}

function CatalogsActionMenu({catalogAssignments, onUpdate}: CatalogsActionMenuProps) {
  return (
    <Menu>
      <MenuButton as={IconButton} aria-label={`Catalog Assignment action menu`} variant="ghost">
        <Icon as={TbDotsVertical} mt={1} color="blackAlpha.400" />
      </MenuButton>
      <MenuList>
        <CatalogAssignmentModal
          catalogAssignments={catalogAssignments}
          onUpdate={onUpdate}
          as="menuitem"
          menuItemProps={{
            justifyContent: "space-between",
            children: (
              <>
                Edit Assignments <EditIcon />
              </>
            )
          }}
        />
      </MenuList>
    </Menu>
  )
}
