import { StructureToolOptions } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemaTypes } from './schemaTypes'

const orderableSchemaTypeNames: Array<(typeof schemaTypes)[number]['name']> = [
    'dev-project',
]

export const sanityStructureConfig: StructureToolOptions = {
    structure: (structureBuilder, context) =>
        structureBuilder
            .list()
            .title('Content')
            .items([
                ...schemaTypes.map((schemaType) =>
                    orderableSchemaTypeNames.includes(schemaType.name)
                        ? orderableDocumentListDeskItem({
                              type: schemaType.name,
                              S: structureBuilder,
                              context,
                          })
                        : structureBuilder.documentTypeListItem(
                              schemaType.name,
                          ),
                ),
            ]),
}
