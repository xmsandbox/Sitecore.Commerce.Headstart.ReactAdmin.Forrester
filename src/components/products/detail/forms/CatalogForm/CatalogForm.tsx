import {Control, FieldValues, useFieldArray} from "react-hook-form"
import {Card, CardBody, Heading, Box, CardHeader, Text, Icon, VStack} from "@chakra-ui/react"
import {CatalogsTable} from "./CatalogsTable"
import {CatalogAssignmentModal} from "./catalog-assignment-modal/CatalogAssignmentModal"
import {TbCactus} from "react-icons/tb"
import {ProductCatalogAssignment} from "ordercloud-javascript-sdk"

interface CatalogFormProps {
  control: Control<FieldValues, any>
}
export function CatalogForm({control}: CatalogFormProps) {
  const fieldArray = useFieldArray({
    control,
    name: `CatalogAssignments`
  })

  const catalogAssignments = fieldArray.fields as ProductCatalogAssignment[]

  if (!catalogAssignments.length) {
    return (
      <Box p={6} display="flex" flexDirection={"column"} alignItems={"center"} justifyContent={"center"} minH={"xs"}>
        <Icon as={TbCactus} fontSize={"5xl"} strokeWidth={"2px"} color="accent.500" />
        <Heading colorScheme="secondary" fontSize="xl">
          <VStack>
            <Text>This product is not assigned to any catalogs</Text>
            <CatalogAssignmentModal
              onUpdate={fieldArray.replace}
              as="button"
              buttonProps={{
                variant: "solid",
                size: "sm",
                colorScheme: "primary"
              }}
            />
          </VStack>
        </Heading>
      </Box>
    )
  }
  return (
    <Card mt={6}>
      <CardHeader display="flex" alignItems={"center"}>
        <Heading as="h3" fontSize="lg" alignSelf={"flex-start"}>
          Catalogs
          <Text fontSize="sm" color="gray.400" fontWeight="normal" marginTop={2}>
            Define which catalogs this product is assigned to
          </Text>
        </Heading>
        <CatalogAssignmentModal
          onUpdate={fieldArray.replace}
          as="button"
          buttonProps={{
            variant: "outline",
            colorScheme: "accent",
            ml: "auto"
          }}
        />
      </CardHeader>
      <CardBody>
        <CatalogsTable fieldArray={fieldArray} control={control} />
      </CardBody>
    </Card>
  )
}
