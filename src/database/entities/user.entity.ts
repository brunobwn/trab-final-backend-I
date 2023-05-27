import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import crypto from 'crypto';
import { IsNotEmpty, MinLength, Matches, IsEmail, IsUrl } from 'class-validator';
import { Message } from './messages.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ length: 100, nullable: false })
	name!: string;

	@Column({ length: 255, nullable: false, unique: true })
    @IsEmail()
	email!: string;

	@Column({ length: 255, nullable: false, select: false })
    @IsNotEmpty()
    @MinLength(6)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
	password!: string;

	@Column({ nullable: true })
    @IsUrl()
	avatar: string | null = null;

	@Column({ length: 10, default: 'user' })
	role: 'admin' | 'user' = 'user';

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;

    @OneToMany(() => Message, (message) => message.user)
	messages: Message[] = [];

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
