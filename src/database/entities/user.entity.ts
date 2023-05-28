import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import crypto from 'crypto';
import { IsNotEmpty, MinLength, Matches, IsEmail, IsUrl, isURL } from 'class-validator';
import { MessageEntity } from './messages.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	name!: string;

	@Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    @IsEmail()
	email!: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
    @IsNotEmpty()
    @MinLength(6)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
	password!: string;

	@Column({ type: 'varchar', nullable: true, default: null })
    @IsUrl()
	avatar!: string | null;

	@Column({ default: "'user'", type: 'varchar', length: 10 })
	role!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;

    @OneToMany(() => MessageEntity, (message) => message.user)
	messages!: MessageEntity[];

    @BeforeInsert()
    setCreatedAt() {
        this.created_at = new Date();
    }

    @BeforeUpdate()
    setUpdatedAt() {
        this.updated_at = new Date();
    }

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if(this.password) {
            const salt = crypto.randomBytes(16).toString('hex');
            const hash = crypto.pbkdf2Sync(this.password, salt, 1000, 64, 'sha512').toString('hex');
            this.password = `${salt}:${hash}`;
        }
    }
}
