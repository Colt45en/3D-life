import { Command, Entity, Transform } from './types'

/**
 * Base command class
 */
abstract class BaseCommand implements Command {
  abstract execute(): void
  abstract undo(): void
  abstract description: string
}

/**
 * Add entity command
 */
export class AddEntityCommand extends BaseCommand {
  description: string
  
  constructor(
    private entity: Entity,
    private entities: Entity[],
    private setEntities: (entities: Entity[]) => void
  ) {
    super()
    this.description = `Add ${entity.type} "${entity.name}"`
  }

  execute(): void {
    this.setEntities([...this.entities, this.entity])
  }

  undo(): void {
    this.setEntities(this.entities.filter(e => e.id !== this.entity.id))
  }
}

/**
 * Delete entity command
 */
export class DeleteEntityCommand extends BaseCommand {
  description: string
  
  constructor(
    private entityIds: string[],
    private entities: Entity[],
    private setEntities: (entities: Entity[]) => void
  ) {
    super()
    this.description = `Delete ${entityIds.length} entity(ies)`
    this.deletedEntities = entities.filter(e => entityIds.includes(e.id))
  }

  private deletedEntities: Entity[]

  execute(): void {
    this.setEntities(this.entities.filter(e => !this.entityIds.includes(e.id)))
  }

  undo(): void {
    this.setEntities([...this.entities, ...this.deletedEntities])
  }
}

/**
 * Transform entity command
 */
export class TransformEntityCommand extends BaseCommand {
  description: string
  
  constructor(
    private entityId: string,
    private oldTransform: Transform,
    private newTransform: Transform,
    private entities: Entity[],
    private setEntities: (entities: Entity[]) => void
  ) {
    super()
    this.description = `Transform entity`
  }

  execute(): void {
    this.setEntities(
      this.entities.map(e =>
        e.id === this.entityId
          ? { ...e, transform: this.newTransform }
          : e
      )
    )
  }

  undo(): void {
    this.setEntities(
      this.entities.map(e =>
        e.id === this.entityId
          ? { ...e, transform: this.oldTransform }
          : e
      )
    )
  }
}

/**
 * Command history manager
 */
export class CommandHistory {
  private history: Command[] = []
  private currentIndex = -1
  private maxHistory = 50

  execute(command: Command): void {
    // Remove any commands after current index
    this.history = this.history.slice(0, this.currentIndex + 1)
    
    // Execute the command
    command.execute()
    
    // Add to history
    this.history.push(command)
    this.currentIndex++
    
    // Limit history size
    if (this.history.length > this.maxHistory) {
      this.history.shift()
      this.currentIndex--
    }
  }

  undo(): boolean {
    if (!this.canUndo()) return false
    
    this.history[this.currentIndex].undo()
    this.currentIndex--
    return true
  }

  redo(): boolean {
    if (!this.canRedo()) return false
    
    this.currentIndex++
    this.history[this.currentIndex].execute()
    return true
  }

  canUndo(): boolean {
    return this.currentIndex >= 0
  }

  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1
  }

  clear(): void {
    this.history = []
    this.currentIndex = -1
  }

  getHistory(): string[] {
    return this.history.map(cmd => cmd.description)
  }
}
